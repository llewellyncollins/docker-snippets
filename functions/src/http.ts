import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'

import getTags from './tags/getTags'

const app = express()

app.use( cors( { origin: true } ) )

app.route( '/tags' )
    .get( async ( req, res ) => {
        getTags( 20 )
            .then( ( tags ) => {
                res.json( tags )
            } )
            .catch( e => {
                res.status( 400 );
                res.send( 'failed to retrieve tags' )
            } );
    } );

export const api = functions.https.onRequest( app )
