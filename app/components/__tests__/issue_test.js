jest.unmock('../issue');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Button} from 'react-bootstrap';
import Issue from '../issue';


describe('Issue component', () => {
    it('this should pass if it at click calls a function', () => {
        var issueObj = {
                comments_url: "https://api.github.com/repos/rails/rails/issues/25840/comments",
                id: 165673964,
                title: "Rails 5: uninitialized constant error",
                user: {
                  login: "bdmac",
                },
                labels: [
                  {
                    url: "https://api.github.com/repos/rails/rails/labels/activesupport",
                    name: "activesupport",
                    color: "FC9300"
                  }
                ],
                state: "open",
                body: "### Steps to reproduce\r\n\r\nException logged in staging environment after upgrading to Rails 5. Unable to provide reproduction steps. Two occurrences logged so far.\r\n\r\n### Expected behavior\r\nNo exception occurs.\r\n\r\n### Actual behavior\r\nReceived exception notification reporting:\r\n```\r\nNameError: uninitialized constant ActiveSupport::Multibyte::Chars Did you mean? ActiveSupport::Multibyte::Chars\r\n```\r\nObviously this is strange for a number of reasons but the primary one being that the DYM output is referencing the exact same constant... as if it actually is loaded/initialized?\r\n\r\nThe error originated at https://github.com/rails/rails/blob/2efddadd6cba4e2129acedf1d402d11abcc03996/activerecord/lib/active_record/connection_adapters/abstract/quoting.rb#L183 and a full backtrace is available at https://app.honeybadger.io/fault/45385/12a19e6f87c11a2ed803dffe51e6e2ef\r\n\r\nWhile not visible in the public Honeybadger link, the referenced line in our application code that ended up hitting this was simply doing `Model.find(id)` where id was a valid UUID as visible within the ActiveJob/Sidekiq params logged by Honeybadger.\r\n\r\n### System configuration\r\n**Rails version**: Rails 5.0.0\r\n\r\n**Ruby version**: ruby 2.3.0p0 (2015-12-25 revision 53290) [x86_64-darwin14]\r\n"
        };
        var commentObj = [{ body: "some text for the body of the isssue"}];

        const buttonInIssue = TestUtils.renderIntoDocument(
            <Issue key={1} data={issueObj} index={1} viewIndividual= {()=>{return "works"}} />
        ); 

        const buttonNode = ReactDOM.findDOMNode(buttonInIssue);

        TestUtils.Simulate.change(
          TestUtils.findRenderedDOMComponentWithTag(Button)
        );
        expect(buttonNode.textContent).toEqual('works');
    
    });
});