

const GoogleSpreadsheet = require('google-spreadsheet')

const credsFile = require('./translate-6e311a3cfd7e.json')

const google = function(router) {
  
  router.get('/api/translate/:word', translate)
}

const translate = function(req, res, next) {
   
  var doc = new GoogleSpreadsheet('1DcST8iSgRxj6wUFTYQjBbiHwki5OBPOn9Sp7qqMFoPU');
    
  doc.useServiceAccountAuth(credsFile, function() {


    doc.getInfo(function(err, info) {


      if (err) {
        return res.status(404).send({success: false, err: err});
      }

      sheet = info.worksheets[0]


      sheet.getCells(
        {
          'min-row': 1,
          'max-row': 5
        }, 
        function(err, cells) {

          if (err) {
            return res.status(404).send({success: false, err: err});
          }

          const cell = cells[22]
          cell.value = req.params.word;
      
          cell.save(function () {

            doc.getInfo(function(err, info) {

              if (err) {
                return res.status(404).send({success: false, err: err});
              }

              sheet = info.worksheets[0]


              sheet.getRows(
                {
                  'offset': 2,
                  'limit': 4
                }, 
                function(err, rows) {

                  if (err) {
                    return res.status(404).send({success: false, err: err});
                  }

                  return res.send(rows)

                }
              )
            
            })
          })
     
        }
      )
    })
  })

}
    


cleanServiceID = function(id) {
  return id.split('*').join('/')
}


module.exports = google

