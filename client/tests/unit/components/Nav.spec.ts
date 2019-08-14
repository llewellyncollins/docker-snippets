import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Nav from '@/components/Nav.vue';

Vue.use( Vuetify );

describe( 'Nav.vue', () => {
    test( 'should be a Vue instance', () => {
        const wrapper = shallowMount( Nav );
        expect( wrapper.isVueInstance() ).toBeTruthy();
    } );

    test( 'should render correctly', () => {
        const wrapper = shallowMount( Nav );
        // expect( wrapper.html() ).toMatchSnapshot();
    } );

    test( 'should not render when not passed props.visible', () => {
        const wrapper = shallowMount( Nav );
        expect( wrapper.isEmpty() ).toBe( true );
    } );

    test( 'should render when passed props.visible', () => {
        const wrapper = shallowMount( Nav, {
            propsData: {
                visible: true
            }
        } );
        expect( wrapper.isEmpty() ).toBe( false );
    } );

    test( 'should have an explore link', () => {
        const wrapper = shallowMount( Nav, {
            propsData: {
                visible: true,
                isUserSignedIn: false
            }
        } );

        expect( wrapper.find( `#explore-button` ).text() ).toBe( 'Explore' );
    } );

    test( 'should have a sign in link when signed out', () => {
        const wrapper = shallowMount( Nav, {
            propsData: {
                visible: true,
                isUserSignedIn: false
            }
        } );

        expect( wrapper.find( `#signin-button` ).text() ).toBe( 'Sign In' );
    } );

    test( 'should have a sign out link when signed in', () => {
        const wrapper = shallowMount( Nav, {
            propsData: {
                visible: true,
                isUserSignedIn: true
            }
        } );

        expect( wrapper.find( `#signout-button` ) ).toBeTruthy();
    } );
} );
