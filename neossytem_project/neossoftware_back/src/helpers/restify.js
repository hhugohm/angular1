'use strict';
var restify = require('restify');
var appError = require('./appError');

/** @exports restifyHelper **/
var restifyHelper = {};




/*
BadRequestError (400 Bad Request)
UnauthorizedError (401 Unauthorized)
PaymentRequiredError (402 Payment Required)
ForbiddenError (403 Forbidden)
NotFoundError (404 Not Found)
MethodNotAllowedError (405 Method Not Allowed)
NotAcceptableError (406 Not Acceptable)
ProxyAuthenticationRequiredError (407 Proxy Authentication Required)
RequestTimeoutError (408 Request Time-out)
ConflictError (409 Conflict)
GoneError (410 Gone)
LengthRequiredError (411 Length Required)
PreconditionFailedError (412 Precondition Failed)
RequestEntityTooLargeError (413 Request Entity Too Large)
RequesturiTooLargeError (414 Request-URI Too Large)
UnsupportedMediaTypeError (415 Unsupported Media Type)
RequestedRangeNotSatisfiableError (416 Requested Range Not Satisfiable)
ExpectationFailedError (417 Expectation Failed)
ImATeapotError (418 I'm a teapot)
UnprocessableEntityError (422 Unprocessable Entity)
LockedError (423 Locked)
FailedDependencyError (424 Failed Dependency)
UnorderedCollectionError (425 Unordered Collection)
UpgradeRequiredError (426 Upgrade Required)
PreconditionRequiredError (428 Precondition Required)
TooManyRequestsError (429 Too Many Requests)
RequestHeaderFieldsTooLargeError (431 Request Header Fields Too Large)
InternalServerError (500 Internal Server Error)
NotImplementedError (501 Not Implemented)
BadGatewayError (502 Bad Gateway)
ServiceUnavailableError (503 Service Unavailable)
GatewayTimeoutError (504 Gateway Time-out)
HttpVersionNotSupportedError (505 HTTP Version Not Supported)
VariantAlsoNegotiatesError (506 Variant Also Negotiates)
InsufficientStorageError (507 Insufficient Storage)
BandwidthLimitExceededError (509 Bandwidth Limit Exceeded)
NotExtendedError (510 Not Extended)
NetworkAuthenticationRequiredError (511 Network Authentication Required)
BadDigestError (400 Bad Request)
BadMethodError (405 Method Not Allowed)
InternalError (500 Internal Server Error)
InvalidArgumentError (409 Conflict)
InvalidContentError (400 Bad Request)
InvalidCredentialsError (401 Unauthorized)
InvalidHeaderError (400 Bad Request)
InvalidVersionError (400 Bad Request)
MissingParameterError (409 Conflict)
NotAuthorizedError (403 Forbidden)
RequestExpiredError (400 Bad Request)
RequestThrottledError (429 Too Many Requests)
ResourceNotFoundError (404 Not Found)
WrongAcceptError (406 Not Acceptable)
*/
restifyHelper.httpError = function(err){
    var httpError;
    if (err === appError.createStudentError ||
        err === appError.createCertifierError ||
        err === appError.getCategoriesError ||
        err === appError.createAuthTokenError ||
        err === appError.updateCourseError ||
        err === appError.getInstituteError ||
        err === appError.getAllUsersError ||
        err === appError.bulkUploadCourseInstitute ||
        err === appError.getInvitationError ||
        err === appError.createInvitationError) {
        httpError = new restify.errors.InternalServerError(err);
    }
    else if (err === appError.loginUserError) {
        httpError = new restify.errors.InvalidCredentialsError(err);
    } else if (err === appError.authTokenError ||
               err === appError.authTockenExpiredError) {
        httpError = new restify.errors.BadRequestError(err);
    } else if (err === appError.emailIsNotForStudentUser) {
        httpError = new restify.errors.InvalidArgumentError(err);

    }

    return httpError;
}



restifyHelper.formatters = {
    /**
     * JSON formatter.
     * @param    {Object} req  the request object
     * @param    {Object} res  the response object
     * @param    {Object} body response body
     * @param    {Function} cb callback
     * @returns  {String}
     */
    'application/json': function (req, res, body, cb) {
        if (body instanceof Error) {
            // snoop for RestError or HttpError, but don't rely on
            // instanceof
            res.statusCode = body.statusCode || 500;

            if (body.body) {
                body = body.body;
            } else {
                body = {
                    code: body.code || body.name,
                    message: body.message
                };
            }
        } else if (Buffer.isBuffer(body)) {
            body = body.toString('base64');
        }

        var data = JSON.stringify(body);
        res.setHeader('Content-Length', Buffer.byteLength(data));

        return cb(null, data);
    }
};

// Lets try and fix CORS support
// By default the restify middleware doesn't do much unless you instruct
// it to allow the correct headers.
//
// See issues:
// https://github.com/mcavage/node-restify/issues/284 (closed)
// https://github.com/mcavage/node-restify/issues/664 (unresolved)
//
// What it boils down to is that each client framework uses different headers
// and you have to enable the ones by hand that you may need.
// The authorization one is key for our authentication strategy
//
restify.CORS.ALLOW_HEADERS.push( "authorization"        );
restify.CORS.ALLOW_HEADERS.push( "withcredentials"      );
restify.CORS.ALLOW_HEADERS.push( "x-requested-with"     );
restify.CORS.ALLOW_HEADERS.push( "x-forwarded-for"      );
restify.CORS.ALLOW_HEADERS.push( "x-real-ip"            );
restify.CORS.ALLOW_HEADERS.push( "x-customheader"       );
restify.CORS.ALLOW_HEADERS.push( "user-agent"           );
restify.CORS.ALLOW_HEADERS.push( "keep-alive"           );
restify.CORS.ALLOW_HEADERS.push( "host"                 );
restify.CORS.ALLOW_HEADERS.push( "accept"               );
restify.CORS.ALLOW_HEADERS.push( "connection"           );
restify.CORS.ALLOW_HEADERS.push( "upgrade"              );
restify.CORS.ALLOW_HEADERS.push( "content-type"         );
restify.CORS.ALLOW_HEADERS.push( "dnt"                  ); // Do not track
restify.CORS.ALLOW_HEADERS.push( "if-modified-since"    );
restify.CORS.ALLOW_HEADERS.push( "cache-control"        );


module.exports = restifyHelper;
