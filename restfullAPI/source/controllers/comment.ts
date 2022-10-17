import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
var htmlconverter = require("html-to-rtf");

const NAMESPACE = 'comments';
const createComment = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'creating a Comment');
    //res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    let { datum, kategorie, kommentar } = req.body;
//htmlconverter.convertHtmlToRtf()
    console.log(NAMESPACE, '\n Datum: \n',datum,'\n kategorie: \n', kategorie, '\n kommentar: \n',kommentar);
    let query = `INSERT INTO basic_data (DATUM, KATEGORIE, KOMMENTAR) VALUES ("${datum}", "${kategorie}", "${kommentar}");`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllComments = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all Comments');

    let query = 'SELECT * FROM basic_data';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createComment, getAllComments };
