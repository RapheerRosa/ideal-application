
DELIMITER ///

CREATE TRIGGER cascade_removal_flag_clients AFTER UPDATE ON clients
    FOR EACH ROW
    BEGIN
      Update clients_contacts set deleted = NEW.deleted where client_id = NEW.id;
      Update clients_address set deleted = NEW.deleted where client_id = NEW.id;
    END;
///

DELIMITER ;
