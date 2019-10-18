const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializaApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
    .document('abrigo/{abrigoId}/pedido/{pedidoId}')
    .onCreate(event => {

        const userId = event.params.userId;

        const db = admin.firestore()

        return db.collection('usuario').doc(userId)
            .get()
            .then(doc => {

                const user = doc.data()

                const msg = {
                    to: user.email,
                    from: 'noreply@vuefirebase.com',
                    subject: "Nova Notificação de Carência",

                    templateId: 'd-70b8ab9bdd004817a12ee5698ec8b748',
                };

            })
    })