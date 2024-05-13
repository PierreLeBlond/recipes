# Recipe

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Testing

Unit & integration tests (vitest)

`pnpm run test`

End to end tests (playwright)

To run the server instance,
`sudo docker run -p 3000:3000 --rm --init -it mcr.microsoft.com/playwright:v1.41.0-jammy /bin/sh -c "cd /home/pwuser && npx -y playwright@1.41.0 run-server --port 3000 --host 0.0.0.0"`

To launch the client instance,
`PW_TEST_CONNECT_WS_ENDPOINT=ws://127.0.0.1:3000/ pnpx exec playwright test`
