var jsonwebtoken = require('jsonwebtoken');
var uuid = require('uuid-random');

/**
 * Function generates a JaaS JWT.
 */
const generate = (privateKey, { id, name, email, avatar, appId, kid }) => {
  const now = new Date()
  const jwt = jsonwebtoken.sign({
    aud: 'jitsi',
    context: {
      user: {
        id,
        name,
        avatar,
        email: email,
        moderator: 'true'
      },
      features: {
        livestreaming: 'true',
        recording: 'true',
        transcription: 'true',
        "outbound-call": 'true'
      }
    },
    iss: 'chat',
    room: '*',
    sub: appId,
    exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
    nbf: (Math.round((new Date).getTime() / 1000) - 10)
  }, privateKey, { algorithm: 'RS256', header: { kid } })
  return jwt;
}

/**
 * Generate a new JWT.
 */
const token = generate('MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCVsfbuvg+29vRg\
CsgSLOfS6K+OSE+WFLumEbitKwfhz59SJlpHla+wo+YvtkPnUN1jGm2C4o5Wj0ZP\
/Q4gR0mllYx6Ck5C717ZG+hWNNKQHevcyZrJrKAhx7PFMsmSRK+pROVkncJV1WLo\
SfgsacSqOil8su53+wpxSSR5DNxXpATDKwAWKD1fKsW7ie4g95ATjwiNOu0tjIEQ\
+y8jaXyoPl75RDVXW8FmM4H3hk6Y0WfPsMdqbSDAXT5yUM/WERHbJZS0VGVHNVWZ\
kRimBKQqZqPdRTHfeEMtbwucbiLoeIWEHSw+vgOBEiLKpQF1Dlrffn9HkAnEihWd\
VUtlIeN5AgMBAAECggEARin6MgEH4Jx0AqhLCqndpy/FSY1/MDtbkQVxaElpEmB8\
rsanPjJc/RB1jhuCTGPMwOzcM6L5UH0rWcak3mBLlr837uPxttH3xQ+doPp1T3OW\
4A/m62xsSikOi/m4HUTwiQhv9O807YJtL6+sETUqJxfH5lkACWCzjlHYNJzgknro\
C16zy5sVwSqEBqcDDqWJ4Uc2BBSGAbOVBourkrJjZdVND2DS1l7VUy2zDp3vnHE2\
45qrrIYVHs6RUP3TrQhA8CLv+YTu7P+L4j7TbFdHYhrKrXpXU+lKhnC8AAmOfanH\
RyZ8mWKgboPjyBZTEunJH/CVY3ekKCfh6VmMFRXQuQKBgQDYSl04BiFFRrXJ9wUf\
Tf7Y/6wtjnpQEwd065TuVH1lcKwIakkWu3Eln9IISD1PUplF6wBl+sD7ZiXnIKMe\
gRJraIfZMuKCYs6Mj3LkMohdvZCQIj25L1RYqF0dJ8nZxe24l8gxWEW+ODOydnbu\
rJdz7rCdyZZzjG6T/c/n0GLJAwKBgQCxLaBE0XL7QqQLE1k9pp0a085ksX4s4LPk\
+c61fwRxBWVYK2zolDO3PkewOA1sum/GYWrdjQ9J5bpU+PrXmBD8JmmHMsyBUdrN\
W7NiT6CUay9Gv5IseyG2WhtUEo5DX9gMM/BGjmdjQqpzGIq4QAxlFaAu9p/M/bhQ\
5J0HUdwS0wKBgHaQ3WUWxypIxuK+DQrKIMgn7+TRU++NXusTMYMswcjX6RZ73TEe\
87miUOrFXwaayvbvCjrdKOknZ+O5mnHgY46JsN657D15mKyo/lxl7yckAZlhi+B2\
N5CaSuDurNI6lEQ6wD18nE7YVE6ibjQMXMHquNrmZRlWhE+QNWZob56tAoGAQE7K\
LBBFhpMSjX6RVoIh5bnY4M1XeZx5TvOoplGa4BbQSOdCGUypVKpDRN+jZ8JnjX6Q\
Vie709uQ/QR9r0DfcVXT2aGDfrCiFQVin509MIGS4D/qI0Dx5IjiAGrXvfaMqSk0\
3bcUKX/p8+qFdwiwNwRZZpJXQAUbIClKIX0BvscCgYA3uQMo/Tw2uEHQp4KC+fAw\
JEbFb5FmhWPIXLF8RJBManzGYrhJX18dR6UNj+Ad62t550ivaNbwG7u6t7wJnFyK\
18Fz8lPb7We5y+005nhA2w7K6Yox8GVV2Rce7nplQx26U+vxHN6O234ROSVliKv4\
OPxGcL3vjaip4y0W7WEPBw==', {
    id: uuid(),
    name: "my user name",
    email: "my user email",
    avatar: "my avatar url",
    appId: "vpaas-magic-cookie-a1b148901d114642ac6131c18d9617be", // Your AppID ( previously tenant )
    kid: "my api key"
});

console.log(token);