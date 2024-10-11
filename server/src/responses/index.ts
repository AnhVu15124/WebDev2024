const userNotFound: ResponseMessage[] = [
    {
        msg: "User Not Found: Incorrect email or password or user have not registered.",
    },
];

const notVerified: ResponseMessage[] = [
    {
        msg: "User Not Verified: Please verify your email address.",
    }
]

const resetPassword: ResponseMessage[] = [
    {
        msg: "If user exists, password reset instruction has been sent to your email.",
    },
];

export { userNotFound, notVerified, resetPassword };