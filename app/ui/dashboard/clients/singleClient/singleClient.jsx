import { updateClient } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";

const SingleClient = ({ client }) => {
  return (
    <div className={styles.formContainer}>
      <form action={updateClient} className={styles.form}>
        <input type="hidden" name="id" value={client.id} />
        {/* Client Data */}
        <div className={styles.formContent}>
          <div className={styles.inputContainer}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Client Name"
              name="name"
              defaultValue={client.name}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Client Email"
              name="email"
              defaultValue={client.email}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Client Image (URL)</label>
            <input
              type="text"
              placeholder="Client Image (URL)"
              name="clientImg"
              defaultValue={client.clientImg}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Budget</label>
            <input
              type="number"
              placeholder="Budget"
              name="budget"
              defaultValue={client.budget}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              defaultValue={client.address}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Payment Method</label>
            <input
              type="text"
              placeholder="Payment Method"
              name="paymentMethod"
              defaultValue={client.paymentMethod}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              defaultValue={client.phone}
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>Note</label>
          <textarea
            placeholder="Note (Others)"
            name="note"
            defaultValue={client.note}
            rows="10"
          />
        </div>

        {/* Insurance Data */}
        <div className={styles.titleContainer}>
          <h3 className={styles.label}>Insurance</h3>
          <button
            className={styles.addButton}
            type="button"
            onClick={"addInsurance"}
          >
            Add Insurance
          </button>
        </div>
        {client.insuranceData.map((insurance, index) => (
          <div key={index} className={`${styles.formContent} ${styles.insuranceContainer}`}>
            <div className={styles.titleLabel}>
              <label>Insurance {index + 1}</label>
            </div>
            <div className={styles.inputContainer}>
              <label>Agent</label>
              <input
                type="text"
                placeholder="Agent"
                defaultValue={insurance.agent}
                // onChange={(e) =>
                //   handleInsuranceChange(index, "agent", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Company</label>
              <input
                type="text"
                placeholder="Company"
                defaultValue={insurance.company}
                // onChange={(e) =>
                //   handleInsuranceChange(index, "company", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Contact</label>
              <input
                type="number"
                placeholder="Contact"
                defaultValue={insurance.contact}
                // onChange={(e) =>
                //   handleInsuranceChange(index, "contact", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Policy Number</label>
              <input
                type="text"
                placeholder="Policy Number"
                defaultValue={insurance.policyNumber}
                // onChange={(e) =>
                //   handleInsuranceChange(index, "policyNumber", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Coverage Type</label>
              <input
                type="text"
                placeholder="Coverage Type"
                defaultValue={insurance.insurancecoverageType}
                // onChange={(e) =>
                //   handleInsuranceChange(
                //     index,
                //     "insurancecoverageType",
                //     e.target.value
                //   )
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Monthly Due Date</label>
              <input
                type="date"
                placeholder="Monthly Due Date"
                defaultValue={insurance.monthlyDueDate}
                // onChange={(e) =>
                //   handleInsuranceChange(index, "monthlyDueDate", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Monthly Amount</label>
              <input
                type="number"
                placeholder="Monthly Amount"
                defaultValue={insurance.monthlyAmount}
                // onChange={(e) =>
                //   handleInsuranceChange(index, "monthlyAmount", e.target.value)
                // }
              />
            </div>
            <button
              type="button"
              className={styles.removeButton}
              // onClick={() => removeInsurance(index)}
            >
              Remove Insurance
            </button>
          </div>
        ))}
        <div className={styles.titleContainer}>
          <h3 className={styles.label}>Cars</h3>
          <button type="button" className={styles.addButton} onClick={"addCar"}>
            Add Car
          </button>
        </div>
        {client.cars.map((car, index) => (
          <div key={index} className={`${styles.carContainer} ${styles.formContent}`}>
            <div className={styles.titleLabel}>
              <label>Car {index + 1}</label>
            </div>
            <div className={styles.inputContainer}>
              <label>Year</label>
              <input
                type="number"
                placeholder="Year"
                defaultValue={car.year}
                // onChange={(e) => handleCarChange(index, "year", e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Model</label>
              <input
                type="text"
                placeholder="Model"
                defaultValue={car.model}
                // onChange={(e) =>
                //   handleCarChange(index, "model", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Trim</label>
              <input
                type="text"
                placeholder="Trim"
                defaultValue={car.trim}
                // onChange={(e) => handleCarChange(index, "trim", e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Chassis (VIN Number)</label>
              <input
                type="text"
                placeholder="Chassis (VIN Number)"
                defaultValue={car.chassis}
                // onChange={(e) =>
                //   handleCarChange(index, "chassis", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Miles</label>
              <input
                type="number"
                placeholder="Miles"
                defaultValue={car.miles}
                // onChange={(e) =>
                //   handleCarChange(index, "miles", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Color</label>
              <input
                type="text"
                placeholder="Color"
                defaultValue={car.color}
                // onChange={(e) =>
                //   handleCarChange(index, "color", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Type of Use</label>
              <select
                defaultValue={car.type}
                // onChange={(e) => handleCarChange(index, "type", e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="commercial">Commercial</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label>Weight (lbs)</label>
              <input
                type="number"
                placeholder="Weight (lbs)"
                defaultValue={car.weight}
                // onChange={(e) =>
                //   handleCarChange(index, "weight", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Plate Type</label>
              <select
                defaultValue={car.plateType}
                // onChange={(e) =>
                //   handleCarChange(index, "plateType", e.target.value)
                // }
              >
                <option value="">Select Plate Type</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label>Plate Number</label>
              <input
                type="text"
                placeholder="Plate Number"
                defaultValue={car.plateNumber}
                // onChange={(e) =>
                //   handleCarChange(index, "plateNumber", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Market Value</label>
              <input
                type="number"
                placeholder="Market Value"
                defaultValue={car.marketValue}
                // onChange={(e) =>
                //   handleCarChange(index, "marketValue", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Plate Expiration Date</label>
              <input
                type="date"
                placeholder="Plate Expiration Date"
                defaultValue={car.plateExpiration}
                // onChange={(e) =>
                //   handleCarChange(index, "plateExpiration", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Insurance Value</label>
              <input
                type="number"
                placeholder="Insurance Value"
                defaultValue={car.insuranceValue}
                // onChange={(e) =>
                //   handleCarChange(index, "insuranceValue", e.target.value)
                // }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Coverage Type</label>
              <input
                type="text"
                placeholder="Coverage Type"
                defaultValue={car.coverageType}
                // onChange={(e) =>
                //   handleCarChange(index, "coverageType", e.target.value)
                // }
              />
            </div>
            <button
              type="button"
              className={styles.removeButton}
              // onClick={() => removeCar(index)}
            >
              Remove Car
            </button>
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingleClient;
