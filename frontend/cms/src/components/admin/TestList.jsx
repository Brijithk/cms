import { useState, useEffect } from "react";
import "./TestList.css";
import AddTest from "./AddTest";
import { getTests } from "../../services/testService";
import ViewTest from "./ViewTest";

function TestList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddTest, setShowAddTest] = useState(false);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTest, setSelectedTest] = useState(null);
    const [showViewTest, setShowViewTest] = useState(false);


    // Fetch tests
    useEffect(() => {

        const fetchTests = async () => {

            try {

                const data = await getTests();

                console.log("TEST API DATA:", data);

                setTests(data);

            } catch (error) {

                console.error(
                    "Error fetching tests:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchTests();

    }, []);


    // Search
    const filteredTests = tests.filter((test) => {

        const search = searchTerm.toLowerCase();

        return (
            String(test.test_id)
                .toLowerCase()
                .includes(search) ||

            String(test.test_name)
                .toLowerCase()
                .includes(search) ||

            String(test.department)
                .toLowerCase()
                .includes(search)
        );

    });


    // View
    const handleViewTest = (test) => {

    setSelectedTest(test);
    setShowViewTest(true);

};


    return (

        <div className="test-section">

            {/* Controls */}
            <div className="test-controls">

                {/* Add Test */}
                <button
                    className="add-test-button"
                    onClick={() => setShowAddTest(true)}
                >
                    <span>+</span>
                    Add Test
                </button>


                {/* Search */}
                <div className="test-search-container">

                    <span className="test-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search tests..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* Loading */}
            {loading ? (

                <p>Loading tests...</p>

            ) : (

                <div className="test-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>Test ID</th>
                                <th>Test Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>TAT</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredTests.length > 0 ? (

                                filteredTests.map((test) => (

                                    <tr
                                        key={test.test_id}
                                    >

                                        <td>
                                            {test.test_id}
                                        </td>


                                        <td>
                                            {test.test_name}
                                        </td>


                                        <td>
                                            {test.department}
                                        </td>


                                        <td>
                                            ₹{test.price}
                                        </td>


                                        <td>
                                            {test.tat}
                                        </td>


                                        <td>

                                            <span
                                                className={`test-status ${
                                                    test.status
                                                        ?.toLowerCase()
                                                        .replaceAll(
                                                            " ",
                                                            "-"
                                                        )
                                                }`}
                                            >
                                                {test.status}
                                            </span>

                                        </td>


                                        <td>

                                            <button
                                                className="view-test-button"
                                                onClick={() =>
                                                    handleViewTest(test)
                                                }
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        style={{
                                            textAlign: "center",
                                            padding: "25px"
                                        }}
                                    >
                                        No tests found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}


            {/* Add Test Modal */}
            {showAddTest && (

                <AddTest
                    onClose={() =>
                        setShowAddTest(false)
                    }

                    onTestAdded={(newTest) => {

                        setTests((prevTests) => [
                            ...prevTests,
                            newTest
                        ]);

                    }}
                />

            )}
            {showViewTest && selectedTest && (
    <ViewTest
        test={selectedTest}

        onClose={() => {
            setShowViewTest(false);
            setSelectedTest(null);
        }}

        onEdit={(test) => {
            console.log("Edit Test:", test);

            // We will create EditTest popup next
        }}

        onDelete={(test) => {
            console.log("Delete Test:", test);

            // We will connect delete API next
        }}
    />
)}
        </div>
    );
}

export default TestList;
