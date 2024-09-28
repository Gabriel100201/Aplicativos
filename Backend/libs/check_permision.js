import { ForbiddenError } from './forbidden_error.js';

export function checkPermission(req, role) {
  // ahora roles es un array
  const roles = req.user?.roles;
  if (!roles || !roles.includes(role)) {
    throw new ForbiddenError();
  }
}