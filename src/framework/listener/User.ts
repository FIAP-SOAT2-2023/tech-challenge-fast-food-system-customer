import * as AWS from 'aws-sdk';
import {DeleteMessageCommand, ReceiveMessageCommand, SQSClient} from "@aws-sdk/client-sqs";


const listenSQSMessages = async () => {
    const sqsClient = new SQSClient({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESSKEY,
            secretAccessKey: process.env.AWS_SECRETKEY,
        },
    });

    const processMessage = async (message: AWS.SQS.Message) => {
        try {
            const body = JSON.parse(message.Body!);
            console.log('Mensagem de notificação de usuário recebida:', body);

        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
        } finally {
            await sqsClient.send(new DeleteMessageCommand({
                QueueUrl: process.env.AWS_CUSTOMER_QUEE01,
                ReceiptHandle: message.ReceiptHandle,
            }));
            console.debug("Message deleted successfully");
        }
    };

    const receiveMessages = async (sqsClient) => {
        try {
            const params = {
                QueueUrl: process.env.AWS_CUSTOMER_QUEE01,
                MaxNumberOfMessages: 10,
                VisibilityTimeout: 30,
                WaitTimeSeconds: 20,
            };

            const receiveMessageCommand = new ReceiveMessageCommand(params);
            const readMessage = await sqsClient.send(receiveMessageCommand);

            if (readMessage.Messages && readMessage.Messages.length > 0) {
                readMessage.Messages.forEach(processMessage);
            }
        } catch (error) {
            console.error('Erro ao receber mensagens:', error);
        } finally {
            receiveMessages(sqsClient);
        }
    };

    receiveMessages(sqsClient);
};

export default listenSQSMessages;
