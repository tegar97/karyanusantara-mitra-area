import { POPULATE_PROFILE } from "../types/users";


export const populateProfile = (profile = {}) => ({
  type: POPULATE_PROFILE,
  payload: profile,
});
