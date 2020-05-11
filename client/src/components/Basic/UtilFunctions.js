import valueInvesting from "../../images/value-investing.png";
import qualityInvesting from "../../images/quality-investing.png";
import ethicalInvesting from "../../images/ethical-investing.png";
import growthInvesting from "../../images/growth-investing.png";
import indexInvesting from "../../images/index-investing.png";
import {Card} from "react-bootstrap";
import React from "react";


export function getStrategyLogo(name) {
    let badge = null;

    switch (name.replace(" ", "")) {
        case "ValueInvesting":
            badge = valueInvesting;
            break;

        case "QualityInvesting":
            badge = qualityInvesting;
            break;

        case "EthicalInvesting":
            badge = ethicalInvesting;
            break;

        case "GrowthInvesting":
            badge = growthInvesting;
            break;

        case "IndexInvesting":
            badge = indexInvesting;
            break;
    }

    return badge;
}

export function getPortfolioCard(name, index) {
    //const name = this.state.mainStrategyList[index].name;

    return <Card style={{width: '22rem'}}>
        <Card.Img style={{width: '10rem', alignSelf: "center"}} variant="top" src={getStrategyLogo(name)}/>

        <Card.Body>
            <Card.Title >Strategy {index + 1} - {name}</Card.Title>
            <Card.Text>
                <b>Portfolios</b> - TBD
            </Card.Text>
            {/*<Button onClick={() => this.handleShow(index)} type="button" variant="primary">Edit</Button>*/}
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<Button onClick={() => this.deleteStore(store)} type="button" variant="primary">Delete</Button>*/}
        </Card.Body>
    </Card>
}

