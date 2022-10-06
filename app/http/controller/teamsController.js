const { InviteRequestModel } = require("../../models/inviteRequests");
const { TeamModel } = require("../../models/team");
const { UserModel } = require("../../models/user");
const { filterObj } = require("../../modules/functions");

class TeamController {
  async createTeam(request, response, next) {
    try {
      const { name, summary, alias, owner = request.user._id } = request.body;
      const uniqueTeam = await TeamModel.findOne({ alias });
      if (uniqueTeam)
        throw { status: "fail", message: "تیم با شناسه وارد شده وجود دارد" };
      const team = await TeamModel.create({
        name,
        summary,
        alias,
        owner,
      });
      if (team)
        return response.status(201).json({
          status: "success",
          message: "تیم با موفقیت ایجاد شد",
        });
      return response.status(500).json({
        status: "fail",
        message: "ایجاد تیم با خطا مواجه شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async inviteUserToTeam(request, response, next) {
    try {
      const { teamID, username } = request.body;
      const hostID = request.user.id;
      console.log(hostID);
      const findTeam = await TeamModel.findOne({
        $or: [
          {
            owner: hostID,
          },
          {
            users: hostID,
          },
        ],
        _id: teamID,
      });
      if (!findTeam)
        throw {
          status: "not found",
          message: "تیم پیدا نشد",
        };
      const user = await UserModel.findOne({
        username,
      });
      if (!user)
        throw {
          status: "not found",
          message: "کاربر یافت نشد",
        };
      const userInTeam = await TeamModel.findOne({
        $or: [
          {
            owner: user._id,
          },
          {
            users: user._id,
          },
        ],
        _id: teamID,
      });
      const userToInvited = await InviteRequestModel.findOne({
        $and: [{ user: user._id }, { teamID: teamID }],
      });
      if (userToInvited || userInTeam)
        throw {
          status: "fail",
          message: "کاربر قبلا به تیم دعوت شده است",
        };
      const inviteRequest = await InviteRequestModel.create({
        teamID,
        host: hostID,
        status: "pending",
        user: user._id,
        requestDate: Date.now(),
      });
      user.inviteRequests.push(inviteRequest._id);
      await user.save({
        validateBeforeSave: true,
      });
      return response.status(200).json({
        status: "success",
        message: "درخواست با موفقیت ثبت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeamsList(request, response, next) {
    try {
      const teams = await TeamModel.find();
      response.status(200).json({
        status: "success",
        data: teams,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyTeam(request, response, next) {
    try {
      const userId = request.user._id;
      const teams = await TeamModel.find({
        $or: [
          {
            owner: userId,
          },
          {
            users: userId,
          },
        ],
      });
      response.status(200).json({
        status: "success",
        data: teams,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateTeam(request, response, next) {
    try {
      const teamID = request.params.id;
      const userID = request.user._id;
      const data = filterObj(request.body, ["name", "summary"]);
      const team = await TeamModel.findOne({
        $and: [
          {
            owner: userID,
          },
          {
            _id: teamID,
          },
        ],
      });
      if (!team)
        throw {
          status: "not found",
          message: "تیم با شناسه وارد شده وجود ندارد",
        };
      const updateTeam = await TeamModel.updateOne(
        { _id: teamID },
        { $set: data },
        {
          runValidators: true,
        }
      );
      console.log(updateTeam);
      if (!updateTeam.matchedCount || updateTeam.modifiedCount < 1) {
        return response.status(400).json({
          status: "fail",
          message: "بروز رسانی تیم انجام نشد",
        });
      }
      return response.status(200).json({
        status: "success",
        data: "ویرایش تیم با موفقیت  انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async removeTeam(request, response, next) {
    try {
      const teamId = request.params.id;
      const project = await TeamModel.deleteOne({
        _id: teamId,
      });
      if (project.deletedCount > 0) {
        return response.status(204).json({});
      }
      return response.status(404).json({
        status: "fail",
        message: "تیم  با شناسه وارد شده وجود ندارد",
      });
    } catch (error) {
      next(error);
    }
  }
  async inviteRequests(request, response, next) {
    try {
      const userID = request.user._id;
      const user = await InviteRequestModel.aggregate([
        {
          $match: { user: userID },
        },
        {
          $lookup: {
            from: "users",
            localField: "host",
            foreignField: "_id",
            as: "host",
          },
        },
        {
          $lookup: {
            from: "teams",
            localField: "teamID",
            foreignField: "_id",
            as: "teamID",
          },
        },
        {
          $project: {
            _id: 0,
            user: 0,
            "host.username": 0,
            "host.password": 0,
            "host.email": 0,
            "host.mobileNumber": 0,
            "host.roles": 0,
            "host.skills": 0,
            "host.teams": 0,
            "host.createdAt": 0,
            "host.updatedAt": 0,
            "host._id": 0,
            "host.profileImage": 0,
            "teamID._id": 0,
            "teamID.alias": 0,
            "teamID.users": 0,
            "teamID.owner": 0,
            "teamID.createdAt": 0,
            "teamID.updatedAt": 0,
          },
        },
        {
          $unwind: "$host",
        },
        {
          $unwind: "$teamID",
        },
      ]);
      return response.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  async getInviteRequestsByStatus(request, response, next) {
    try {
      const userID = request.user._id;
      const { status } = request.params;
      const user = await UserModel.aggregate([
        {
          $match: { _id: userID },
        },
        {
          $lookup: {
            from: "inviterequests",
            localField: "inviteRequests",
            foreignField: "_id",
            as: "inviteRequests",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "inviteRequests.host",
            foreignField: "_id",
            as: "host",
          },
        },
        {
          $project: {
            requests: {
              $filter: {
                input: "$inviteRequests",
                as: "request",
                cond: {
                  $eq: ["$$request.status", status],
                },
              },
            },
            _id: 0,
          },
        },
        {
          $unwind: "$requests",
        },
      ]);
      return response.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  async userInviteRequestsAction(request, response, next) {
    try {
      const userID = request.user._id;
      const { requestID, status } = request.params;
      console.log(request.params);
      const inviteRequest = await InviteRequestModel.findOne({
        $and: [
          {
            _id: requestID,
          },
          {
            user: userID,
          },
        ],
      });
      if (!inviteRequest)
        throw {
          status: "not found",
          message: "درخواست دعوتی با شناسه وارد شده یافت نشد",
        };
      console.log(inviteRequest);
      if (inviteRequest.status !== "pending")
        throw {
          status: "fail",
          message: "این درخواست قبلا رد یاپذیرفته شده است",
        };
      const updateResult = await InviteRequestModel.updateOne(
        { _id: requestID },
        {
          $set: { status: status },
        }
      );
      if (updateResult.modifiedCount < 1)
        throw {
          status: "fail",
          message: "تغییر وضعیت درخواست با خطا مواجه شد",
        };
      if (status === "accepted") {
        const addUserToTeam = await TeamModel.updateOne(
          {
            _id: inviteRequest.teamID,
          },
          {
            $push: {
              users: userID,
            },
          }
        );
        if (addUserToTeam.modifiedCount < 1)
          throw {
            status: "fail",
            message: "تغییر وضعیت درخواست با خطا مواجه شد",
          };
      }
      return response.status(200).json({
        status: "success",
        message: "درخواست شما با موفقیت ثبت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeamById(request, response, next) {
    try {
      const teamID = request.params.id;
      const team = await TeamModel.findById(teamID);
      if (!team) {
        return response.status(404).json({
          status: "not found",
          message: "تیم با شناسه وارد شده یافت نشد!",
        });
      }
      response.status(200).json({
        status: "success",
        data: team,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  TeamController: new TeamController(),
};
