import { ForbiddenError } from './forbidden_error.js';

export function checkPermission(req, role) {
  console.log(req.user);
  // ahora roles es un array
  const roles = req.user?.roles;
  if (!roles || !roles.includes(role)) {
    throw new ForbiddenError();
  }
}