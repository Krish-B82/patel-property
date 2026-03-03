const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function uploadImage() {
    try {
        // Step 1: Login
        console.log('Logging in...');
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'patel.property.admin@gmail.com',
            password: 'PatelProperty@2026!Secure'
        });

        const token = loginResponse.data.token;
        console.log('✅ Login successful');

        // Step 2: Check file exists
        const filePath = 'C:\\Users\\krish\\OneDrive\\Desktop\\Screenshot 2026-02-02 010744.png';
        if (!fs.existsSync(filePath)) {
            console.log('❌ File not found at:', filePath);
            return;
        }
        console.log('✅ File found');

        // Step 3: Create a new property
        console.log('Creating new property...');
        // Generate a unique code using timestamp to satisfy unique constraint
        const uniqueCode = `TEST-${Date.now()}`;

        const propertyData = {
            code: uniqueCode,
            title: 'Test Property with New Schema',
            description: 'This is a test property created by the upload test script.',
            min_price: 5000000,
            max_price: 7500000,
            city: 'Vadodara',
            location: 'Alkapuri',
            property_type: 'apartment',
            bedrooms: 3,
            bathrooms: 3,
            area_sqft: 1800,
            instagram_video_url: 'https://www.instagram.com/reel/C2_r3q/example',
            status: 'available'
        };

        const createResponse = await axios.post(
            'http://localhost:5000/api/properties',
            propertyData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const propertyId = createResponse.data.property.id;
        console.log('✅ Property created successfully');
        console.log('Property ID:', propertyId);
        console.log('Property Code:', uniqueCode);

        // Step 4: Upload image to the new property
        console.log('Uploading image...');
        const form = new FormData();
        form.append('images', fs.createReadStream(filePath));

        const uploadResponse = await axios.post(
            `http://localhost:5000/api/properties/${propertyId}/images`,
            form,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...form.getHeaders()
                }
            }
        );

        console.log('✅ Upload successful');
        console.log(JSON.stringify(uploadResponse.data, null, 2));

    } catch (error) {
        console.log('❌ Error message:', error.message);
        if (error.response) {
            console.log('❌ Error status:', error.response.status);
            console.log('❌ Error data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.log('❌ No response received');
        }
    }
}

uploadImage();
