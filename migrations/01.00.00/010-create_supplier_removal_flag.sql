
DELIMITER ///

CREATE TRIGGER cascade_removal_flag_suppliers AFTER UPDATE ON suppliers
    FOR EACH ROW
    BEGIN
      Update suppliers_contacts set deleted = NEW.deleted where supplier_id = NEW.id;
      Update suppliers_address set deleted = NEW.deleted where supplier_id = NEW.id;
    END;
///

DELIMITER ;
