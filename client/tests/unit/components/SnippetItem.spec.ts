import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import SnippetItem from '@/components/SnippetItem.vue';

Vue.use( Vuetify );

describe( 'Snippet.vue', () => {
    test( 'should be a Vue instance', () => {
        const wrapper = shallowMount( SnippetItem );
        expect( wrapper.isVueInstance() ).toBeTruthy();
    } )

    test( 'should render correctly', () => {
        const wrapper = shallowMount( SnippetItem );
        // expect( wrapper.html() ).toMatchSnapshot();
    } );

    test( 'should show the correct snippet information', () => {
        const description = 'Lorem Ipsum';
        const content = 'FROM node';
        const wrapper = shallowMount( SnippetItem, {
            propsData: {
                name: 'Test SNIPPET',
                author: 'JOHN Doe',
                description,
                content,
                tags: [ 'tEst', 'NODE' ],
                downloads: 50,
                stars: 25
            }
        } );

        expect( wrapper.find( `.snippet-name` ).text() ).toBe( 'Test Snippet' );
        expect( wrapper.find( `.snippet-author` ).text() ).toBe( 'John Doe' );
        expect( wrapper.find( `.snippet-description` ).text() ).toBe( description );
        expect( wrapper.find( `.snippet-content` ).text() ).toBe( content );
    } );
} );