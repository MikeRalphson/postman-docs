/*
 * {
    "results": [
        {
            "hits": [
                {
                    "title": "...",
                    "description": "...",
                    "bodyPlainText": "**REMOVE_THIS**",
                    "tags": ["...", "..."],
                    "objectID": "...",
                    "_highlightResult": {
                        "bodyPlainText": {
                            "value": "**REMOVE_THIS**"
                        }
                    }
                }
            ]
        }
    ]
}

 */

export const searchClient = {
  async search(requests) {
    console.log('Request',JSON.stringify(requests));
    const payload = {
      table: 'postman',
      text: requests[0].params.query
    };
    if (!payload.text) return { results: [ { hits: [ 
	    { fields: {},  _highlightResult: { title: 'Miss' }, tags: ['a'] }
    ] } ] };
    const res = await fetch('http://localhost:3031/messages', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    const res2 = await fetch('http://localhost:3031/messages');
    const json2 = await res2.json();
    const json3 = JSON.parse(json2[0].text);
    console.log('Response',json3);
    return { results: [ json3.map(function(e) {
      { hits: e.map(function(f) {
	return { fields: {},  _highlightResult: { title: 'Hit' }, tags: [ 'a' ] } }) } } ) ] };
  }
};

