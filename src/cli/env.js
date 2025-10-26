const parseEnv = () => {
  const result = [];
  for (let key in process.env) {
    if (key.startsWith("RSS")) {
      result.push(`${key}=${process.env[key]}`)
    }
  }
  console.log(result.join("; "))
};

parseEnv();
