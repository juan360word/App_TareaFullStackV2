import { transport } from "../Backend/config/nodeEmail"

type TypeMail = {
    email: string
    name: string
    token: string
}


export class AuthCorreo {

    static EnvioConfiguracionEmail = async (users: TypeMail) => {
        const informacion = await transport.sendMail({
            from: 'AdTareas <taread@gmail.com>',
            to: users.email,
            subject: 'AdTareas - Confirma tu cuenta',
            text: 'AdTareas - Confirma tu cuenta',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f0e17; padding: 40px; border-radius: 12px;">
    
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ff8906; font-size: 32px; margin: 0;">AdTareas</h1>
                <p style="color: #a7a9be; margin: 5px 0;">Gestiona tus proyectos con estilo</p>
            </div>

            <!-- Contenido -->
            <div style="background-color: #1a191f; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
                <h2 style="color: #ffffff; font-size: 22px;">¡Hola, ${users.name}! 👋</h2>
                <p style="color: #a7a9be; font-size: 16px; line-height: 1.6;">
                    Has creado tu cuenta en <strong style="color: #ff8906;">AdTareas</strong>. 
                    Solo falta confirmarla para empezar a gestionar tus proyectos.
                </p>

                <!-- Token -->
                <div style="background-color: #0f0e17; border: 2px solid #ff8906; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
                    <p style="color: #a7a9be; margin: 0 0 10px 0; font-size: 14px;">Tu código de confirmación</p>
                    <span style="color: #ff8906; font-size: 36px; font-weight: bold; letter-spacing: 8px;">
                        ${users.token}
                    </span>
                </div>

                <!-- Botón -->
                <div style="text-align: center; margin: 25px 0;">
                    <a href="${process.env.FRONTEND_URL}/confirmacion" 
                    style="background-color: #ff8906; color: #0f0e17; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                        Confirmar mi cuenta
                    </a>
                </div>

                <!-- Warning -->
                <p style="color: #a7a9be; font-size: 13px; text-align: center; margin-top: 20px;">
                    ⚠️ Este código expira en <strong style="color: #ff8906;">6 minutos</strong>. 
                    Si no solicitaste esto, ignora este mensaje.
                </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center;">
                <p style="color: #a7a9be; font-size: 12px;">
                    © 2026 AdTareas · Todos los derechos reservados
                </p>
            </div>

        </div>
`

        })
        console.log('mensaje enviado', informacion.messageId)
    }
}
