import jws from 'jsonwebtoken'


type userPayload = {
    id:string
}

export function JWT(payload:userPayload) {
    
    const token = jws.sign(payload,process.env.LLAVE_PRIVADAJWT,

        {
        expiresIn:'90d'
        }
       
    )
        return token
}

