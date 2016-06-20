var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');

var storageConf = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/cfdi');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({storage: storageConf}).array('cfdi_xml', 12);

router.get('/', function(req, res, next) {
	var files = fs.readdirSync("./uploads/cfdi");
	var newFiles = [];

	//console.log(files);

	while(files.length){
		newFiles.push(files.splice(0, 4));
	}

	console.log(newFiles);

  res.render('cfdi', { title: 'Swarnabh Banerjee | CFDI', cfdiFiles: newFiles});
});

router.post('/', function (req, res, next) {
	upload(req,res,function(err) {
        if(err) {
        	console.log(err);
            return res.send(500);
        }
        console.log("Done");
        res.send(200);
    });
});

router.get('/facturas', function(req, res, next) {
	var parseString = require('xml2js').parseString;
	var jsonData = null;

	console.log("File: " + req.param("id"));

	fs.readFile('./uploads/cfdi/' + req.param("id"), 'utf-8', function(err, data){
		parseString(data, function (err, result) {
			jsonData = result;

			res.render('cfdi_facturas', { title: 'Swarnabh Banerjee | CFDI', result: jsonData});
		});
	});
  
});




module.exports = router;