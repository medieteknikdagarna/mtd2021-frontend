import React from 'react';
import { Route } from 'react-router';
 
export default (
    <Route>
        <Route exact path={"/" + ""} />
        <Route exact path={"/" + "about/"} />
        <Route exact path={"/" + "about/privacy-policy/"} />
        <Route exact path={"/" + "contact/"} />
        <Route exact path={"/" + "contact/group/"} />
        <Route exact path={"/" + "contact/press/"} />
        <Route exact path={"/" + "companies/"} />
        <Route exact path={"/" + "studentexpo/"} />
        {/*}
        <Route exact path={"/" + "lectures"} render={(props) => <Lectures {...props} lang={this.state.lang} />}/>
        <Route exact path={"/" + "pictures"} render={(props) => <Pictures {...props} lang={this.state.lang} />}/>
        */}
    </Route>
);