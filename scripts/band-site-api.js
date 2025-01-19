class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    }

    static async getInstance() {
        const storedApiKey = sessionStorage.getItem('apiKey');
        if (storedApiKey) {
            BandSiteApi.instance = new BandSiteApi(storedApiKey);
            console.log(`Api instance retrieved from storage: ${BandSiteApi.instance}`);
        }
        else {
            try {
                const response = await axios.get("https://unit-2-project-api-25c1595833b2.herokuapp.com/register");
                if (response.status === 200) {
                    const apiKey = response.data.api_key;
                    BandSiteApi.instance = new BandSiteApi(apiKey);
                    sessionStorage.setItem('apiKey', apiKey);
                    console.log(`New Api instance init: ${BandSiteApi.instance}`);
                }
                else {
                    console.log(`Status: ${response.status}`);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        return BandSiteApi.instance;
    }

    async postComment(commentObject) {
        try {
            const response = await axios.post(`${this.baseURL}comments?api_key=${this.apiKey}`, commentObject);
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(`Status: ${response.status}`);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async getComments() {
        try {
            const response = await axios.get(`${this.baseURL}comments?api_key=${this.apiKey}`);
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(`Status: ${response.status}`);
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    async likeComment(commentId) {
        try {
            const response = await axios.put(`${this.baseURL}comments/${commentId}/like?api_key=${this.apiKey}`);
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(`Status: ${response.status}`)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteComment(commentId) {
        try {
            const response = await axios.delete(`${this.baseURL}comments/${commentId}?api_key=${this.apiKey}`);
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(`Status: ${response.status}`);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async getShows() {
        try {
            const response = await axios.get(`${this.baseURL}showdates?api_key=${this.apiKey}`);
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(`Status: ${response.status}`);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

async function main() {
    const response = await axios.get('https://unit-2-project-api-25c1595833b2.herokuapp.com/register');
    const apiKey = response.data["api_key"];
    const api = new BandSiteApi(apiKey);
    const comments = await api.getComments();
    console.log(comments[0]);
    await api.likeComment(comments[0].id);
    // await api.getShows();
    // const newCommentObj = {
    //     name: "Bruce Wayne",
    //     comment: "No comment."
    // }
    // const res = await api.postComment(newCommentObj);
    // const delObject = await api.deleteComment(res.id);
    // console.log(`Comment deleted: ${delObject.id}`);
}

// main();
