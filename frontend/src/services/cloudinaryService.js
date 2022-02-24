const CLOUD_NAME = 'echoshare';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

export async function uploadImg(ev) {
    const formData = new FormData();
    formData.append('file', ev.target.files[0]);
    formData.append('upload_preset', 'g0chqgej');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        return data.secure_url;
    } catch (err) {
        return {
            error: {
                message:
                    'Oops, could not upload the image to server, try again',
            },
        };
    }
}
