import axions from 'axios';

const api = axions.create({
    baseURL: 'https://discord.com/api'
});

export {
    api
}