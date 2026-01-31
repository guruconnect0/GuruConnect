export const auth = (req, res, next) => {
  req.user = { id: "65abc123456789000111222" }; // dummy mentor id
  next();
};
