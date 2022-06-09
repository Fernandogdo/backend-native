
import { String } from "aws-sdk/clients/cloudwatchevents";
import S3 from "aws-sdk/clients/s3";
import 'dotenv/config'
import fs from "fs";

const bucketName = "native-ec"
const region = "us-east-1"
const accessKeyId = "AKIA2WLVEGMUJ3RE5HJB"
const secretAccessKey = "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"

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
})

//uploads a file to s3
export function uploadFile(file: any) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}


// exports.uploadFile = uploadFile

//downloads a file from s3
export function getFileStream(filekey: any) {

    const downloadParams = {
        Key: filekey,
        Bucket: bucketName
    }


    return s3.getObject(downloadParams).createReadStream()

    // return s3.listObjects(downloadParams, function (err, data) {
    //     if (err) {
    //         console.log("Error", err);
    //     } else {
    //         console.log("Success", data.Contents);
            
    //     }
    // });
}

