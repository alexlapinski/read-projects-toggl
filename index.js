var request = require('request'),
      _ = require('underscore');

var apiToken = "9c754d8e9cae109fe216791d98c08849";
// TODO externalize apiToken to nconf file

var projects = [];

request({
        method: "GET",
        auth: {
            'user': apiToken,
            'pass': 'api_token'
        },
        url: "https://www.toggl.com/api/v8/me?with_related_data=true"
    }, function(error, response, body) {

        if( !error && response.statusCode === 200) {
            //console.log(body);
            var obj = JSON.parse(body);
            //console.log(obj.data.projects);
            _.each(obj.data.projects, function(item){
                    projects.push({
                            name: item.name,
                            startDate: item.created_at,
                            endDate: item.at
                    });
            });

            console.log(projects);
            // TODO: Store these projects into Mongoose
            //console.log(_.pluck(projects, 'name'));

        } else {
            console.log('Error: ' + error);
        }

});
