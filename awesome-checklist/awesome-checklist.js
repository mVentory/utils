/**
 * Created by yogasukma on 3/10/16.
 */

var AwesomeCookie = Cookies.noConflict();

(function ( $ ) {
    function checklist( id ) {
        if ( id != undefined ) {
            var checkboxId   = "check-" + id + "-" + awesome_checklist_var.postId;
            var checked      = false;
            var checkedClass = "";

            if ( AwesomeCookie.get( checkboxId ) ) {
                checked      = "checked";
                checkedClass = "mvcheckliston";
            }
            return "<input type='checkbox' class='awesome-checklist-li " + checkedClass + "' id='" + checkboxId + "' " + checked + ">";
        }
    }

    // adding checkbox on every li.
    $( document ).ready(
        function () {
            // @TODO: need to make dynamic selector rather than "article li"
            // ul.mvchecklist
            $( "article li" ).each(
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
            var id = $( this ).attr( 'id' );
            var value = $( this ).prop( 'checked' );

            if ( value ) {
                AwesomeCookie.set(
                    id, value, {
                        expires : 365
                    }
                );
                $( this ).addClass( 'mvcheckliston' );
            }
            else {
                AwesomeCookie.remove( id );
                $( this ).removeClass( 'mvcheckliston' )
            }
        }
    );

})( jQuery );
