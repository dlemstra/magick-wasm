# Building magick-wasm

### Install dependencies

This project uses the `magick-native` library that is inside the GitHub package registry. To be able to build this project you need to authenticate with the GitHub package registry. You can do this by creating a personal access token and update the `.npmrc` file with the following content:

```
//npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
```

This access token needs the `read:packages` scope. You can create a personal access token by following the instructions [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).