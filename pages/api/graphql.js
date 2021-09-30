// Short way
export default (req, res) => {
  // NextJS helpers
  res.status(200).json({
    test: 'Hello there',
  });
};

// Long way
// export default (req, res) => {
//   res.setHeader('Content-Type', 'application/json'); // Type of response
//   res.statusCode = 200;
//   res.end(
//     JSON.stringify({
//       test: 'Hello there',
//     })
//   );
// };
