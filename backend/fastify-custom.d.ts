import { FastifyInstance } from 'fastify';

export interface CustomFastifyInstance extends FastifyInstance {
    authenticate: (
        request: FastifyRequest,
        reply: FastifyReply,
        done: (err?: Error) => void
    ) => void;
}
