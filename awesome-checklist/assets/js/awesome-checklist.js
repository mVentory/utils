/**
 * Created by yogasukma on 3/10/16.
 */

var AwesomeCookie = Cookies.noConflict();

(function ( $ ) {
    function checklist( id ) {
        if ( id != undefined ) {
            // var checkboxId   = "chk-" + id + "-" + awesome_checklist_var.postId;
            var checkboxId   = "chk-" + id;
            var checked      = false;
            var checkedClass = "";

            if ( AwesomeCookie.get( checkboxId ) ) {
                checked      = "checked";
                checkedClass = "mvcheckliston";
            }
            return "<input type='checkbox' value='1' class='awesome-checklist-li " + checkedClass + "' id='" + checkboxId + "' " + checked + ">";
        }
    }

    // adding checkbox on every li.
    $( document ).ready(
        function () {
            $( "ul.mvchecklist li" ).each(
                function () {
                    $( this ).prepend(
                        checklist(
                            $( this ).attr( 'id' )
                        )
                    );
                }
            )
        }
    );

    // create the cookies
    $( document ).on(
        'change', ".awesome-checklist-li", function () {
            var id    = $( this ).attr( 'id' );
            var value = $( this ).prop( 'checked' );

            if ( value ) {
                AwesomeCookie.set(
                    id, 1, {
                        expires : 365,
                        path :    awesome_checklist_var.url
                    }
                );
                $( this ).addClass( 'mvcheckliston' );
            }
            else {
                AwesomeCookie.remove(
                    id, {
                        path : awesome_checklist_var.url
                    }
                );
                $( this ).removeClass( 'mvcheckliston' )
            }
        }
    );

})( jQuery );
