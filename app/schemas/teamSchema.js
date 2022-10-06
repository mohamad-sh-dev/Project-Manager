const createTeamSchema = {
  title: "createTeam",
  $id: "createTeam",
  type: "object",
  properties: {
    name: {
      title: "name",
      $id: "#createTeam/name",
      type: "string",
      minLength: 8,
      pattern: "^[A-Za-z][A-Za-z0-9_]{7,29}$",
      errorMessage: {
        pattern: "نام تیم معتبر نمیباشد",
        minLength: "عنوان تیم باید حداقل دارای هشت کاراکتر باشد",
      },
    },
    summary: {
      title: "summary",
      $id: "#createTeam/summary",
      type: "string",
    },
    alias: {
      title: "alias",
      $id: "#createTeam/alias",
      type: "string",
    },
    users: {
      title: "users",
      $id: "#createTeam/users",
      type: "array",
    },
  },
  errorMessages: {
    type: "داده های ورودی نا معتبرند",
  },
  additionalProperties: false,
  required: ["name", "summary", "alias"],
  errorMessage: {
    type: "داده های ورودی نا معتبرند",
    additionalProperties: "داده های غیر مجاز",
    required: "داده های مورد نیاز",
  },
};
const updateTeamSchema = {
  title: "updateTeamSchema",
  $id: "updateTeam",
  type: "object",
  properties: {
    name: {
      title: "name",
      $id: "#updateTeam/name",
      type: "string",
      minLength: 8,
      pattern: "^[A-Za-z ][A-Za-z0-9_ ]{7,29}$",
      errorMessage: {
        pattern: "عنوان تیم معتبر نمیباشد",
        minLength: "عنوان تیم باید حداقل دارای هشت کاراکتر باشد",
      },
    },
    summary: {
      title: "summary",
      $id: "#updateTeam/summary",
      type: "string",
    },
  },
  errorMessages: {
    type: "داده های ورودی نا معتبرند",
  },
  additionalProperties: false,
  required: [],
  errorMessage: {
    type: "داده های ورودی نا معتبرند",
    additionalProperties: "داده های غیر مجاز",
    required: "داده های مورد نیاز",
  },
};
const inviteUserToTeamSchema = {
  title: "inviteUserToTeam",
  $id: "inviteUser",
  type: "object",
  properties: {
    username: {
      title: "username",
      $id: "#inviteUser/username",
      type: "string",
      minLength: 8,
      pattern: "^[A-Za-z][A-Za-z0-9_]{7,29}$",
      errorMessage: {
        pattern: "نام کاربری معتبر نمیباشد",
        minLength: "نام کاربری باید حداقل دارای هشت کاراکتر باشد",
      },
    },
    teamID: {
      title: "teamID",
      $id: "#inviteUser/teamID",
      type: "string",
      minLength: 24,
      maxLength: 24,
      errorMessage: {
        maxLength: "شناسه تیم معتبر نیست",
        minLength: "شناسه تیم معتبر نیست",
      },
    },
  },
  errorMessages: {
    type: "داده های ورودی نا معتبرند",
  },
  additionalProperties: false,
  required: ["username", "teamID"],
  errorMessage: {
    type: "داده های ورودی نا معتبرند",
    additionalProperties: "داده های غیر مجاز",
    required: "داده های مورد نیاز",
  },
};
const userInviteRequestsActionSchema = {
  title: "userInviteRequestsAction",
  $id: "inviteRequestAction",
  type: "object",
  properties: {
    requestID: {
      title: "requestID",
      $id: "#inviteRequestAction/requestID",
      type: "string",
      minLength: 24,
      maxLength: 24,
      errorMessage: {
        maxLength: "شناسه درخواست دعوت معتبر نیست",
        minLength: "شناسه درخواست دعوت معتبر نیست",
      },
    },
    status: {
      title: "status",
      $id: "#inviteRequestAction/status",
      type: "string",
      enum: ["accepted", "rejected"],
      errorMessage: {
        enum: "مفدار وارد شده برای وضعیت معتبر نیست",
      },
    },
  },
  errorMessages: {
    type: "داده های ورودی نا معتبرند",
  },
  additionalProperties: false,
  required: ["requestID", "status"],
  errorMessage: {
    type: "داده های ورودی نا معتبرند",
    additionalProperties: "داده های غیر مجاز",
    required: "داده های مورد نیاز",
  },
};
const removeTeamSchema = {
  title: "removeTeamSchema",
  $id: "deleteTeam",
  type: "object",
  properties: {
    id: {
      title: "id",
      $id: "#deleteTeam/id",
      type: "string",
      minLength: 24,
      maxLength: 24,
      errorMessage: {
        maxLength: "شناسه تیم معتبر نیست",
        minLength: "شناسه تیم معتبر نیست",
      },
    },
  },
  errorMessages: {
    type: "داده های ورودی نا معتبرند",
  },
  additionalProperties: false,
  required: ["id"],
  errorMessage: {
    type: "داده های ورودی نا معتبرند",
    additionalProperties: "داده های غیر مجاز",
    required: "داده های مورد نیاز",
  },
};

module.exports = {
  createTeamSchema,
  removeTeamSchema,
  updateTeamSchema,
  inviteUserToTeamSchema,
  userInviteRequestsActionSchema,
};
