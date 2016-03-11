var gulp   = require( "gulp" );
var concat = require( "gulp-concat" );
var uglify = require( "gulp-uglify" );

gulp
    .task(
        "default", [ "scripts" ], function () {
            gulp.watch( "assets/js/*.js", [ "scripts" ] );
        }
    )

    .task(
        "scripts", function () {
            gulp
                .src(
                    [
                        "assets/js/js.cookie.js",
                        "assets/js/awesome-checklist.js"
                    ]
                )
                .pipe( concat( 'scripts.js' ) )
                .pipe( uglify() )
                .pipe( gulp.dest( "." ) );
        }
    );
