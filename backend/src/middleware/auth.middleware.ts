import fastifyJwt from '@fastify/jwt'
import { FastifyReply, FastifyRequest } from 'fastify'

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const authoriationHeader = request.headers.authorization;
    try {

        if (!authoriationHeader) {
            return reply
                .code(400)
                .send({ message: 'Usuário não autorizado' })
        }

        const [_, token] = authoriationHeader.split(' ')[1]

        if (!token) return reply.code(400).send({ message: 'Token inválido' })

        const decoded: any = request.jwtVerify()

        // req.user = decoded?.user
        // next();
        console.log(decoded)

    } catch (err) {
        reply.code(404).send({ error: 'Token inválido' });
    }
}

export { authMiddleware }

