import React from "react";

export default function Public() {
    return (
        <section>
            <div class="container border rounded mt-5 p-5">
                <form>
                    <div class="row d-xl-flex align-items-xl-center">
                        <div class="col">
                            <label class="form-label" for="from">
                                From
                            </label>
                            <input
                                id="from"
                                class="form-control"
                                type="search"
                                placeholder="Enter Starting "
                            />
                        </div>
                        <div class="col">
                            <label class="form-label" for="destination">
                                To
                            </label>
                            <input
                                id="destination"
                                class="form-control"
                                type="search"
                                placeholder="Enter destination "
                            />
                        </div>
                        <div class="col">
                            <label class="form-label" for="date">
                                Date
                            </label>
                            <input id="date" class="form-control" type="date" />
                        </div>
                    </div>
                    <div class="row d-xl-flex align-items-xl-center mt-5">
                        <div class="col d-xl-flex justify-content-xl-center">
                            <button class="btn btn-primary" type="button">
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="container mt-5">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Bus Name</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Fair</th>
                                <th>Description </th>
                                <th>View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Bus 1</td>
                                <td>Chittagong</td>
                                <td>Dhaka</td>
                                <td>1200tk</td>
                                <td>Well</td>
                                <td class="d-xl-flex justify-content-xl-center align-items-xl-center">
                                    <i class="fas fa-eye"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
