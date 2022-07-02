global.validator = {};
const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file != 'index.js') {
    global.validator = {
      ...global.validator,
      [file.replace(".validator.js", "")]: require(path.resolve(
        __dirname,
        file
      ))
    }
  }
}