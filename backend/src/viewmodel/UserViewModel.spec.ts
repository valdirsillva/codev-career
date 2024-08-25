import { describe, expect, test } from "@jest/globals";

import Fastify from "fastify";

const app = Fastify({ logger: false, });

describe("Created new User", () => {
    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    test('valid email should return true', () => {
        const validEmails = [
            'test@example.com',
            'user@gmail.com',
            'jhon.doe@gmail.com.br'
        ]
        validEmails.forEach((email) => {
            expect(isValidEmail(email)).toBe(true)
        })
    })

    test('invalid email should return false', () => {
        const invalidEmails = [
            '',
            'invalidemail',
            'user@',
            '@domain.com',
        ];

        invalidEmails.forEach((email) => {
            expect(isValidEmail(email)).toBe(false);
        });
    });
})