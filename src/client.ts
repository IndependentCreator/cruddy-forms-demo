class CruddyForm extends HTMLElement {
    changeHandler;
    inputHandler;
    requirements: Map<string, string>;
    requirementsNodes: Map<string, HTMLElement>;

    constructor() {
        super();
        this.changeHandler = this.handleChange.bind( this );
        this.inputHandler = this.handleInput.bind( this );
        this.requirementsNodes = new Map<string, HTMLElement>();
        this.requirements = new Map<string, string>();

        // Handle all elements that have the data-endpoint attribute.
        this.querySelectorAll( "[data-endpoint]" ).forEach( ( element ) => {
            if ( element instanceof HTMLInputElement ) {
                // Store the initial contents of the requirements message.
                if ( element.parentNode ) {
                    const requirementsNode = element.parentNode.querySelector( "div.requirements" );
                    if ( requirementsNode && requirementsNode instanceof HTMLElement ) {
                        this.requirementsNodes.set( element.id, requirementsNode );
                        this.requirements.set( element.id, requirementsNode.innerHTML );
                    }
                }
                // Register listeners.
                element.addEventListener( "input", this.inputHandler );
                element.addEventListener( "change", this.changeHandler );
            }
        } );
    }

    /** Call the remote validator if the local validation has succeeded. */
    handleChange( event: Event ) {
        if ( !( event.target instanceof HTMLInputElement ) ) {
            return;
        }
        const element = event.target;
        if ( !element.validity.valid ) {
            return;
        }

        const url = event.target.getAttribute( "data-endpoint" ) + element.value;
        fetch( url )
            .then( ( response ) => ( response.status === 422 ? response.json() : null ) )
            .then( ( data ) => {
                const requirementsNode = this.requirementsNodes.get( element.id );
                const requirementsHTML = this.requirements.get( element.id );
                if ( data && data.message ) {
                    element.setCustomValidity( data.message );
                    if ( requirementsNode && requirementsHTML ) {
                        if ( this.requirements ) {
                            requirementsNode.innerHTML = data.message;
                        }
                    }
                    element.focus();
                } else {
                    element.setCustomValidity( "" );
                }
                if ( !requirementsNode || !requirementsHTML ) {
                    element.reportValidity();
                }
            } );
    }

    /** Reset the error message once the user starts editing. */
    handleInput( event: Event ) {
        if ( !( event.target instanceof HTMLInputElement ) ) {
            return;
        }
        event.target.setCustomValidity( "" );
        const requirementsNode = this.requirementsNodes.get( event.target.id );
        const requirementsHTML = this.requirements.get( event.target.id );
        if ( requirementsNode && requirementsHTML ) {
            if ( this.requirements ) {
                requirementsNode.innerHTML = requirementsHTML;
            }
        }
    }
}
customElements.define( "cruddy-form", CruddyForm );
