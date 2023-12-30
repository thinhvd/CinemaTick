const getData = async (path, page = 1) => {
    const res = await fetch(`http://fall2324w20g8.int3306.freeddns.org/api/${path}?page=${page}`);
    const data = await res.json();
    return data;
};
/**
 *
 
@param {string} path current table page
@param {string || number} id the id of deleting item
*/
const deleteData = async (path, id) => {
    try {
        await fetch(`http://fall2324w20g8.int3306.freeddns.org/api/${path}/${id}`, {
            method: 'DELETE',
        });
        console.log('Delete succesfully');
    } catch (error) {
        console.log('There was an error!', error);
    }
};

const addData = async (path, data = {}) => {
    try {
        const res = await fetch(`http://fall2324w20g8.int3306.freeddns.org/api/${path}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return res.ok;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { getData, deleteData, addData };