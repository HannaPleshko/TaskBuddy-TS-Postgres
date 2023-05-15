export const ExceptionType = {
  DB_INITIALIZE_NOT_INITIALIZED: { id: 1, message: 'DB not initialized.' },
  DB_INITIALIZE_NOT_CONNECTED: { id: 2, message: 'DB not connected.' },

  DB_USERS_CREATE_NOT_CREATED: { id: 3, message: 'DB not created user.' },
  DB_USERS_GET_ALL_NOT_GOT: { id: 4, message: 'DB not got users.' },
  DB_USERS_GET_BY_ID_NOT_GOT: { id: 5, message: 'DB not got user.' },
  DB_USERS_DELETE_NOT_DELETED: { id: 6, message: 'DB not deleted user.' },
  DB_USERS_UPDATE_NOT_UPDETED: { id: 7, message: 'DB not updated user.' },
  DB_USERS_NOT_FOUND: { id: 8, message: 'DB not found user.' },

  DB_SKILLS_CREATE_NOT_CREATED: { id: 9, message: 'DB not created skill.' },
  DB_SKILLS_GET_ALL_NOT_GOT: { id: 10, message: 'DB not got skills.' },
  DB_SKILLS_GET_BY_ID_NOT_GOT: { id: 11, message: 'DB not got skill.' },
  DB_SKILLS_DELETE_NOT_DELETED: { id: 12, message: 'DB not deleted skill.' },
  DB_SKILLS_UPDATE_NOT_UPDETED: { id: 13, message: 'DB not updated skill.' },
  DB_SKILLS_NOT_FOUND: { id: 14, message: 'DB not found skill.' },

  DB_USER_GET_BY_EMAIL_NOT_GOT: { id: 15, message: 'DB not got user by email.' },
  DB_USER_GET_BY_EMAIL_NOT_FOUND: { id: 16, message: 'DB not found user by email.' },
  DB_USER_GET_BY_EMAIL_ALREADY_EXIST: { id: 17, message: 'DB user already exist.' },
  DB_USER_INVALID_CREDENTIALS: { id: 18, message: 'DB user credentials invalid.' },
};

export const SuccessfullyType = {
  DB_USER_SUCCESS_AUTHENTICATE: 'DB successfully user authenticate.',
  DB_USER_SUCCESS_REGISTRATE: 'DB successfully user  registrate user.',
  DB_USER_SUCCESS_CHANGE_CREDENTIALS: 'DB successfully change user credentials.',
  DB_USER_SUCCESS_DELETE_USER: 'DB successfully delete user.',
};
