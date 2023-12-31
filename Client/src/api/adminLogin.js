const adminLogin = async (data) => {
    try {
        const res = await fetch(`http://fall2324w20g8.int3306.freeddns.org/api/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { adminLogin };
