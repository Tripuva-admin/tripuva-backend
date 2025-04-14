import axios from 'axios';
import { whatsappConfig } from '../config/whatsapp.js';
import { logger } from '../utils/logger.js';

export class WhatsAppService {
    static async sendTextMessage(phone, message) {
        try {
            const response = await axios.post(
                whatsappConfig.apiUrl,
                {
                    userId: '',
                    fullPhoneNumber: phone,
                    callbackData: 'response_sent',
                    type: 'Text',
                    data: {
                        message: message,
                        preview_url: false
                    }
                },
                {
                    headers: whatsappConfig.headers
                }
            );
            logger.info('Message sent successfully:', response.data);
            return response.data;
        } catch (error) {
            logger.error('Error sending message:', error.response?.data || error);
            throw error;
        }
    }

    static async sendImageMessage(phone, message, imageUrl) {
        try {
            const response = await axios.post(
                whatsappConfig.apiUrl,
                {
                    userId: '',
                    fullPhoneNumber: phone,
                    callbackData: 'response_sent',
                    type: 'Image',
                    data: {
                        caption: message,
                        mediaUrl: imageUrl || 'https://oahorqgkqbcslflkqhiv.supabase.co/storage/v1/object/public/package-assets/static%20assets/Tripuva%20(9).png',
                        message: message
                    }
                },
                {
                    headers: whatsappConfig.headers
                }
            );
            logger.info('Image sent successfully:', response.data);
            return response.data;
        } catch (error) {
            logger.error('Error sending image:', error.response?.data || error);
            throw error;
        }
    }
} 