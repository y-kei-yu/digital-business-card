export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["./jest.setup.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
    },

    //jest:ReferenceError: TextEncoder is not definedの対応
    testEnvironment: 'jest-fixed-jsdom',
};

