const authorDTO = (author) => {
  const authorDTO = {
    authorId: author.authorId,
    name: author.name,
    email: author.email,
  };
  return authorDTO;
};

module.exports = {
  authorDTO,
};
