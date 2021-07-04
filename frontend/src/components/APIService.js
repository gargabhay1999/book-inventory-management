export default class APIService {

    static InsertBook(body) {
        if(body.quantity <=0){
            alert("Please enter valid quantity")
        }
        else{
            return fetch(`https://eflask-app-abhay.herokuapp.com/addBook`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
        }
    }

    static DeleteBook(googleId) {
        return fetch(`https://eflask-app-abhay.herokuapp.com/deleteBookByGoogleId/${googleId}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    static UpdateBook(googleId, body) {
        return fetch(`https://eflask-app-abhay.herokuapp.com/updateBookByGoogleId/${googleId}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }
    
}
