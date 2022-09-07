import React from "react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

export default function Footer() {
    return (
        <div class="container footer">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <a
                        href="/"
                        class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
                    >
                        ZTicket
                    </a>
                    <span class="text-muted">© 2021 Company, Inc</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3">
                        <a class="text-muted" href="#">
                            <BsInstagram />
                        </a>
                    </li>
                    <li class="ms-3">
                        <a class="text-muted" href="#">
                            <BsTwitter />
                        </a>
                    </li>
                    <li class="ms-3">
                        <a class="text-muted" href="#">
                            <BsFacebook />
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}
